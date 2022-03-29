import { Component, Input } from '@angular/core';

@Component({
	selector: 'app-winner-card',
	templateUrl: './winner-card.component.html',
	styleUrls: ['./winner-card.component.css']
})
export class WinnerCardComponent {
	@Input() winner!: string;
	@Input() options!: any[];
	constructor() { }
}
