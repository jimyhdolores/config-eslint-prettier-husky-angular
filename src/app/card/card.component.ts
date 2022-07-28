import { Component, OnInit } from '@angular/core';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
	//crear variables
	message?: string;

	ngOnInit(): void {
		console.log('');
	}

	getMessage(): string {
		return '';
	}
}
