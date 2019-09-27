import { Component, OnInit } from '@angular/core';
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnInit{

  constructor(private ble: BluetoothLE) {}


  ngOnInit(): void {
    // INTENTO DE REGISTRAR COORDENADAS AL SALIR DEL COCHE
    // this.ble.initialize().subscribe( (res) => {
    //   this.ble.getAdapterInfo().then((res) => {
    //     console.log(res)
    //     if(res.isScanning === false) {
    //       // this.ble.startScan(null).subscribe( (res) => {
    //       //   console.log(res);
    //       //   // this.ble.stopScan().then( (res) => {
    //       //   //   console.log(res);
    //       //   // });
    //       // })
    //     }
    //     else {
    //       this.ble.stopScan().then( (res) => {
    //         console.log(res);
    //       });
    //     }
    //   }, (err) => console.log(err));

    // });

  }
}
