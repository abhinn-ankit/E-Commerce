import {Component,  OnInit} from '@angular/core';
import {UserAccountService} from '../services/userAccount.service';
import {Router} from '@angular/router';
import {SharedService} from '../services/shared.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {
  userName: string;
  searchResult: string;
  cartCount: string;

  constructor(private userAccountService: UserAccountService, private router: Router, private sharedService: SharedService) {
    sharedService.changeEmitted$.subscribe();
  }

  ngOnInit() {
    this.userAccountService.user = JSON.parse(localStorage.getItem('user'));
    if ( this.userAccountService.isLoggedIn() ) {
      this.userName = this.userAccountService.user.firstName + ' ' + this.userAccountService.user.lastName;
    }else if ( !this.userAccountService.isLoggedIn() ) {
      this.userName = 'My account';
    }
  }
  // noinspection TsLint
  btnAnimation = false;
  // noinspection TsLint
  searchBarVisible = false;
  // noinspection TsLint
  borderBottom = false;

  changeBorder() {
    this.borderBottom = !this.borderBottom;
  }

  borderBottomStyle() {
    const styles = {
      'border-bottom': '1px solid #80bdff'
    };
    // noinspection TsLint
    if (this.borderBottom)
      return styles;
  }

  showSearchBar() {
    this.searchBarVisible = !this.searchBarVisible;
  }

  onClickBtn() {
    this.btnAnimation = !this.btnAnimation;
  }

  isLoggedIn() {
    return this.userAccountService.isLoggedIn();
  }

  onLogout() {
    this.userAccountService.logOut();
    this.userName = 'My account';
    window.location.replace('/home');
  }

}
