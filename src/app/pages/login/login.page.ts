import { Component, OnInit } from '@angular/core';
import { ProductService } from 'src/app/services/product.service';
import { AlertController, LoadingController, NavController } from '@ionic/angular';
import { Login } from 'src/app/models/login.model';
import { FirebaseAuthService } from 'src/app/services/firebaseauth.service';
import { AppConstantService } from 'src/app/core/appconstant.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  loginModel: Login = {
    email: null,
    password: null
  };
  loader: any;
  errorMessage: any;

  constructor(private productService: ProductService,
    private alertController: AlertController,
    private loadingController: LoadingController,
    private nav: NavController,
    private firebaseAuthService: FirebaseAuthService,
    private appConstant: AppConstantService) { }

  ngOnInit() {
    this.buildLoader();
  }

  ionViewDidEnter() {
    if (this.firebaseAuthService.userDetails()) {
      this.nav.navigateRoot('/profile');
    } else {
      this.clearData();
      this.nav.navigateRoot('/login');
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

  async onLoginButtonClick() {
    await this.showLoader();
    if (!this.validate()) {
      await this.hideLoader();
      this.showAlert("Invalid Login", "Invalid username or password", null);
      return;
    }
    this.firebaseAuthService.login(this.loginModel).then(res => {
      console.log(res);
      this.errorMessage = "";
      this.nav.navigateForward('/profile');
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
    this.loginModel.email = null;
    this.loginModel.password = null;
  }
  validate() {
    return this.loginModel.email != null && this.loginModel.password != null;
  }
  onCreateNewButtonClick() {
    this.nav.navigateRoot('/registration');
  }

}
