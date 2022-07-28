import { Component, Input, OnInit } from '@angular/core';

@Component({
	selector: 'app-card',
	templateUrl: './card.component.html',
	styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {
	@Input() name?: string;
	//crear variables
	message?: string;

	ngOnInit(): void {
		console.log('');
	}

	getMessage(): string {
		return '';
	}
}
