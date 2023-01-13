import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { PromoCodeService } from 'src/service/promoCode.service';
import { ServerService } from 'src/service/server.service';
import { HttpService } from 'src/service/http.service';
import { UserService } from 'src/service/user.service';
import { PromoCode } from 'src/models/PromoCode';
import { Server } from 'src/models/Server.model';
import { NgForm } from '@angular/forms';
import { User } from 'src/models/User';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit {
  @ViewChild("addNewItemForm") ngFormLogin: NgForm

  promoCode: PromoCode[]
  servers: Server[]
  users: User[]

  customServer: Server

  editServerID: number = null

  isNameValid = true
  isCpuValid = true
  isRamValid = true
  isStorageValid = true
  isTypeValid = true
  isPriceValid = true
  error = ""

  constructor(private ser: ServerService, private http: HttpService, private promo: PromoCodeService, private userS: UserService) { }

  ngOnInit(): void {
    this.promo.getAllPromoCodes()
    this.ser.getAllServers()
    this.userS.getAllUsers()

    this.promo.promoCodeSubject.subscribe(p => this.promoCode = p)
    this.userS.userSubject.subscribe(u => this.users = u)
    this.ser.serversSubject.subscribe(s => this.servers = s)

    this.customServer = { id: null, cpu: null, name: null, price: null, ram: null, space: null, stype: null }
  }

  editServer(id: any) {
    this.servers.map(s => {
      if (s.id === id) {
        this.editServerID = s.id
        this.ngFormLogin.setValue({
          "name": s.name,
          "cpu": s.cpu,
          "ram": s.ram,
          "type": s.stype,
          "price": s.price,
          "storage": s.space
        })
      }
    })
  }

  clear() {
    this.ngFormLogin.reset()
    this.editServerID = null
    this.isNameValid = true
    this.isCpuValid = true
    this.isRamValid = true
    this.isStorageValid = true
    this.isTypeValid = true
    this.isPriceValid = true
  }

  ngAfterViewInit(): void {
    this.ngFormLogin.valueChanges.subscribe((value) => {
      this.customServer = {
        id: null,
        cpu: value.cpu,
        name: value.name,
        price: value.price,
        ram: value.ram,
        space: value.storage,
        stype: value.type
      }

    })
  }

  isNumeric(n: any) {
    return !isNaN(parseFloat(n)) && isFinite(n);
  }

  onSubmit() {
    const cpu = this.ngFormLogin.value.cpu
    const ram = this.ngFormLogin.value.ram
    const name = this.ngFormLogin.value.name
    const price = this.ngFormLogin.value.price
    const space = this.ngFormLogin.value.storage
    const stype = this.ngFormLogin.value.type

    this.isNameValid = true
    this.isCpuValid = true
    this.isRamValid = true
    this.isStorageValid = true
    this.isTypeValid = true
    this.isPriceValid = true

    if (!cpu) this.isCpuValid = false
    if (!ram) this.isRamValid = false
    if (!name) this.isNameValid = false
    if (!price) this.isPriceValid = false
    if (!space) this.isStorageValid = false
    if (!stype) this.isTypeValid = false

    if (this.ser.getServerNames().includes(name)) {
      this.error = "Name already in use"
      this.isNameValid = false
      return
    }

    if (!this.isNameValid || !this.isCpuValid || !this.isRamValid || !this.isStorageValid || !this.isTypeValid || !this.isPriceValid) {
      this.error = "All fields are required"
      return
    }

    const cpuVal = !this.isNumeric(cpu)
    this.isCpuValid = !cpuVal
    if (cpuVal) this.error = "Can only contain numbers"

    const priceVal = !this.isNumeric(price)
    this.isPriceValid = !priceVal
    if (priceVal) this.error = "Can only contain numbers"

    const ramVal = !this.isNumeric(ram)
    this.isRamValid = !ramVal
    if (ramVal) this.error = "Can only contain numbers"

    const spaceVal = !this.isNumeric(space)
    this.isStorageValid = !spaceVal
    if (spaceVal) this.error = "Can only contain numbers"

    if (this.isNameValid && this.isCpuValid && this.isRamValid && this.isStorageValid && this.isTypeValid && this.isPriceValid) {
      if (this.editServerID) {
        this.customServer.id = this.editServerID
        this.http.update<Server>("/api/server/update", this.customServer).subscribe(() => this.ser.getAllServers())
      } else {
        this.http.sendData<Server>("/api/server/new", this.customServer).subscribe(() => this.ser.getAllServers())
      }

      this.clear()
      return
    }
  }

}
