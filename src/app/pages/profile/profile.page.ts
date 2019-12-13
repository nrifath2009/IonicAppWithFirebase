import { Component, OnInit } from '@angular/core';
import { EmailSenderService } from 'src/app/services/email-sender.service';
import { FirebaseAuthService } from 'src/app/services/firebaseauth.service';
import { NavController } from '@ionic/angular';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  loggedInUser: any;

  constructor(private emailSenderService: EmailSenderService,
    private firbaseAuthService: FirebaseAuthService,
    private nav: NavController) {

  }

  ionViewDidEnter() {
    if (this.firbaseAuthService.userDetails()) {
      this.loggedInUser = this.firbaseAuthService.userDetails().email;
      console.log("loggedInUser: " + this.loggedInUser);
    }

  }

  ngOnInit() {

  }
  onEmailSendClick() {
    console.log('Email Send Click!');
    this.emailSenderService.sendEmail();
  }
  onSignOutClick() {
    console.log('onSignOutClick');
    this.firbaseAuthService.logoutUser()
      .then(res => {
        console.log(res);
        this.nav.navigateBack('');
      })
      .catch(error => {
        console.log(error);
      })
  }

}
