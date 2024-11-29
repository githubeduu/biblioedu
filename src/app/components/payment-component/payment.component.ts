import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { RouterModule } from '@angular/router';
import { CarroService } from '../../services/carro-service/carro.service';
import { UserService } from '../../services/usuario-service/usuario.service';

@Component({
  selector: 'app-payment-component',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './payment.component.html',
  styleUrl: './payment.component.scss'
})
export class PaymentComponent implements OnInit {
  items: any[] = [];
  total: number = 0;
  currentUser: any;

  constructor(
    private carroService: CarroService,
    private userService: UserService
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();
    this.items = this.carroService.getItems();
    this.total = this.carroService.getTotal();
  }

  logout() {
    this.userService.logout();
    this.currentUser = null;
  }
}


