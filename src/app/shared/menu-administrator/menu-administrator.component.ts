import { AuthService } from './../../core/services/api/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-menu-administrator',
  templateUrl: './menu-administrator.component.html',
  styleUrls: ['./menu-administrator.component.scss'],
  imports: [IonicModule]
})
export class MenuAdministratorComponent implements OnInit {


  isProductsSubMenuOpen: boolean = false;
  userData: any;

  title = 'Menu Administrador';
  constructor(private router: Router, private authService: AuthService) {
    this.getUserData();

  }

  ngOnInit(): void {
  }
  isSidebarOpen = false; // Estado del sidebar

  // Alternar el estado del sidebar
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Navegar a una pestaña
  navigateTo(tab: string) {

    if (tab === '/logout') {
      this.router.navigate(['/login']);
      this.authService.logout();
      return;
    }
    this.router.navigate([`/${tab}`]);
    this.toggleSidebar(); // Cierra el sidebar después de navegar
  }

  toggleProductsSubMenu() {
    this.isProductsSubMenuOpen = !this.isProductsSubMenuOpen;
  }

  async getUserData() {
    await this.authService.getUserData().then((data) => {
      console.log(data);

      this.userData = data;
    });
  }

}
