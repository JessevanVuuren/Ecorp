import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { NbDialogService } from '@nebular/theme';
import { Server } from 'src/models/Server.model';
import { ServerService } from 'src/service/server.service';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit, AfterViewInit {
  @ViewChild("addNewItemForm") ngFormLogin: NgForm

  customServer: Server
  servers: Server[]

  editServerID: number = null

  isNameValid = true
  isCpuValid = true
  isRamValid = true
  isStorageValid = true
  isTypeValid = true
  isPriceValid = true
  error = ""

  constructor(private ser: ServerService) { }

  ngOnInit(): void {
    this.ser.getAllServers()
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
  
    if (!this.isNameValid || !this.isCpuValid || !this.isRamValid || !this.isStorageValid || !this.isTypeValid || !this.isPriceValid) {
      this.error = "All fields are required"
      return
    }

    const cpuVal = !this.isNumeric(cpu)
    this.isCpuValid = !cpuVal
    if (cpuVal) this.error = "Can only contain numbers"
    
    const priceVal = !this.isNumeric(price)
    this.isStorageValid = !priceVal
    if (cpuVal) this.error = "Can only contain numbers"

    const ramVal = !this.isNumeric(ram)
    this.isRamValid = !ramVal
    if (cpuVal) this.error = "Can only contain numbers"

    const spaceVal = !this.isNumeric(space)
    this.isPriceValid = !spaceVal
    if (cpuVal) this.error = "Can only contain numbers"

    if (this.isNameValid && this.isCpuValid && this.isRamValid && this.isStorageValid && this.isTypeValid && this.isPriceValid) {
      this.error = "all is good"
      return
    }
  }

}
