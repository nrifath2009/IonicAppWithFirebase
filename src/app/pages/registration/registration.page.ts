import { Component, OnInit } from '@angular/core';
import { Registration } from './registration.model';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { FirebaseAuthService } from 'src/app/services/firebaseauth.service';
import { AppConstantService } from 'src/app/core/appconstant.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.page.html',
  styleUrls: ['./registration.page.scss'],
})
export class RegistrationPage implements OnInit {

  registrationModel: Registration = {
    name: null,
    email: null,
    password: null
  };
  errorMessage: any;
  loader: any;



  constructor(private alertController: AlertController,
    private loadingController: LoadingController,
    private nav: NavController,
    private firebaseAuthService: FirebaseAuthService,
    private appConstant: AppConstantService) { }

  ngOnInit() {
    this.buildLoader();
  }

  ionViewDidEnter() {
    this.redirect();
  }
  redirect() {
    if (this.firebaseAuthService.userDetails()) {
      this.nav.navigateRoot('/profile');
    } else {
      this.clearData();
      this.nav.navigateRoot('/registration');
    }
  }

  async showAlert(header, subHeader, message) {
    const alert = await this.alertController.create({
      header: header,
      subHeader: subHeader,
      message: message,
      buttons: ['OK']
    });
    await alert.present();
  }
  async buildLoader() {
    this.loader = await this.loadingController.create({
      message: "Processing...",
      duration: 2000
    });
  }
  async showLoader() {
    await this.loader.present();
  }
  async hideLoader() {
    await this.loader.dismiss();
  }

  async onSignUpButtonClick() {
    await this.showLoader();
    if (!this.validate()) {
      await this.hideLoader();
      this.showAlert("Invalid Login", "Invalid username or password", null);
      return;
    }
    this.firebaseAuthService.register(this.registrationModel).then(res => {
      console.log(res);
      this.redirect();
    }, err => {
      console.log(err);
      this.errorMessage = this.appConstant.ErrorMessage(err);
    });
    await this.hideLoader();
    //this.nav.navigateForward('profile');


  }

  onCancelButtonClick() {
    this.clearData();
  }
  clearData() {
    this.registrationModel.name = null;
    this.registrationModel.email = null;
    this.registrationModel.password = null;
  }
  validate() {
    return this.registrationModel.email != null && this.registrationModel.password != null;
  }

}
