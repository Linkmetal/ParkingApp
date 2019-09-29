import { Injectable } from '@angular/core';
import { ToastController } from '@ionic/angular';

@Injectable({
  providedIn: 'root'
})
export class ToastService {

  constructor(private toastController: ToastController) { }

  async create(message: string, duration?: number) {
    const toast = await this.toastController.create({
      message: message,
      duration: duration || 2000
    });
    toast.present();
  }
}
