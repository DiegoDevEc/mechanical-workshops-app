import { AuthService } from '../../core/services/api/auth.service';
import { Component, Input, OnInit } from '@angular/core';
import { NavigationBehaviorOptions, Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-menu-client',
  templateUrl: './menu-client.component.html',
  styleUrls: ['./menu-client.component.scss'],
  imports: [IonicModule]
})
export class MenuClientComponent implements OnInit {

  title: string = '';
  nameUser: string = '';

  isProductsSubMenuOpen: boolean = false;
  userData: any;

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
    // Opción 1: Reemplazar en el historial
    const navigationOptions: NavigationBehaviorOptions = {
      replaceUrl: true
    };

    // Opción 2: Forzar recarga de componentes
    if (this.router.getCurrentNavigation()?.previousNavigation) {
      this.router.dispose(); // Elimina componentes anteriores
    }

    if (tab === '/logout') {
      this.authService.logout();
      this.router.navigate(['/login'], navigationOptions);
      return;
    }
    this.router.navigate([`/${tab}`], navigationOptions);
    this.toggleSidebar();
  }

  toggleProductsSubMenu() {
    this.isProductsSubMenuOpen = !this.isProductsSubMenuOpen;
  }

  async getUserData() {
    await this.authService.getUserData().then((data) => {
      this.userData = data;

      this.nameUser = this.userData.firstname + " " +  this.userData.lastname;
    });
  }

}
