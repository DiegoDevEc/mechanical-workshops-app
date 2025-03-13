import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-menu-administrator',
  templateUrl: './menu-administrator.component.html',
  styleUrls: ['./menu-administrator.component.scss'],
  imports: [IonicModule]
})
export class MenuAdministratorComponent  implements OnInit {

  title = 'Menu Administrador';
  constructor(private router: Router) { }

  ngOnInit(): void {
  }
  isSidebarOpen = false; // Estado del sidebar

  // Alternar el estado del sidebar
  toggleSidebar() {
    this.isSidebarOpen = !this.isSidebarOpen;
  }

  // Navegar a una pestaña
  navigateTo(tab: string) {
    console.log(`Navegando a: ${tab}`);

    this.router.navigate([`/${tab}`]);
    this.toggleSidebar(); // Cierra el sidebar después de navegar
  }

}
