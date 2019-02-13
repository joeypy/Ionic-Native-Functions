import { Component } from '@angular/core';
import { NavController, ToastController } from 'ionic-angular';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { BarcodeScanner, BarcodeScannerOptions } from '@ionic-native/barcode-scanner';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  base64Image;
  scannedData:any = {};
  encodeText:string;
  encodedData:any = {};

  constructor(public navCtrl: NavController,
              public camera: Camera,
              public toastCtrl: ToastController,
              private barcodeScanner: BarcodeScanner) {
  }


  getPhotoFromCamera(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.CAMERA,
      targetWidth: 600,
      //targetHeight: 300,
      saveToPhotoAlbum: true,
      //allowEdit: true,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
      }, 
      (err) => {
        // Handle error
        this.presentToast('No se ha seleccionado imagen');
      });
  }

  getPhotoFromGallery(){
    const options: CameraOptions = {
      quality: 100,
      destinationType: this.camera.DestinationType.DATA_URL,
      encodingType: this.camera.EncodingType.JPEG,
      mediaType: this.camera.MediaType.PICTURE,
      sourceType: this.camera.PictureSourceType.PHOTOLIBRARY,
      targetWidth: 600,
      correctOrientation: true
    }
    
    this.camera.getPicture(options).then(
      (imageData) => {
        // imageData is either a base64 encoded string or a file URI
        // If it's base64 (DATA_URL):
        this.base64Image = 'data:image/jpeg;base64,' + imageData;
      }, 
      (err) => {
        // Handle error
        this.presentToast('No se ha seleccionado imagen');
      });
  }


  presentToast(msg){
    let toast = this.toastCtrl.create({
      message: msg,
      duration: 2000,
      position: 'bottom'
    })
    toast.present();
    
  }

  scanQR(){
    const options: BarcodeScannerOptions = {
      preferFrontCamera: false,
    };

    this.barcodeScanner.scan(options).then(
      (barcodeData) => {
        //this.presentToast(barcodeData);
        this.scannedData = barcodeData;
     }).catch(err => {
        this.presentToast("Error: " + err);
     });
  }

  encodeToQR(){
    this.barcodeScanner.encode(this.barcodeScanner.Encode.TEXT_TYPE, this.encodeText).then(
      (data) => {
        if(data.text == ""){
          this.presentToast("No hay datos codificados en el QR");
        }else{
          this.encodedData = data;
        }
      },
      (err) => {
        console.log("Error: "+err)
      }
    );
  }
  

}
