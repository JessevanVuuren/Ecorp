import { Component, ViewChild, AfterViewInit, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
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

  editServerID:number

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
          "type": s.space,
          "price": s.price,
          "storage": s.space
        })
        // this.ngFormLogin.
        // this.ngFormLogin.
        // this.ngFormLogin.
        // this.ngFormLogin.
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

  onSubmit() {
    const cpu = this.ngFormLogin.value.cpu
    const name = this.ngFormLogin.value.name
    const price = this.ngFormLogin.value.price
    const ram = this.ngFormLogin.value.ram
    const space = this.ngFormLogin.value.space
    const stype = this.ngFormLogin.value.stype

    // if 


    // isNameValid = true
    // isCpuValid = true
    // isRamValid = true
    // isStorageValid = true
    // isTypeValid = true
    // isPriceValid = true
  }

}
