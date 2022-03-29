import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component } from '@angular/core';
import { faHand, faHandBackFist, faHandScissors, faL } from '@fortawesome/free-solid-svg-icons';

@Component({
	selector: 'app-board',
	templateUrl: './board.component.html',
	styleUrls: ['./board.component.css'],
	animations: [
		trigger('openClose', [
			state('open', style({
				visibility: 'visible'
			})),
			state('close', style({
				visibility: 'hidden'
			})),
			transition('open => close', [
				animate('0s')
			]),
			transition('close => open', [
				animate('1s')
			])
		])
	]
})

export class BoardComponent {
	//whether is winner chip is closed or not
	isOpen!: boolean;
	//winner of the game
	winner!: string;

	//Icons for game
	options!: any[];

	//Finale Options
	finale!: any[];

	constructor() {
		this.newGame();
	}

	playSound(url: string) {
		new Audio(url).play();
	}

	newGame() {
		this.playSound('assets/start.wav');
		this.isOpen = false;
		this.winner = '';
		this.options = [
			{
				id: 0,
				name: 'stone',
				className: 'fa-rock',
				iconName: faHandBackFist
			},
			{
				id: 1,
				name: 'paper',
				className: 'fa-paper',
				iconName: faHand
			},
			{
				id: 2,
				name: 'scissors',
				className: 'fa-scissors',
				iconName: faHandScissors
			}
		];
	}

	computerMove() {
		return Math.floor((Math.random() * 10) % 3);
	}

	playGame(playerMove: number) {
		if (!this.isOpen) {
			let computerMove: number = this.computerMove();

			this.finale = [
				this.options[playerMove],
				this.options[computerMove]
			];

			if (playerMove === computerMove) {
				this.winner = 'No one';
				this.isOpen = true;
				this.playSound('assets/error.wav');
				return;
			}

			//stone wins (stone-scissors)
			let stone = (playerMove === 0) && (computerMove === 2);
			//paper wins (paper-stone)
			let paper = (playerMove === 1) && (computerMove === 0);
			//scissors wins (scissors-paper)
			let scissors = (playerMove === 2) && (computerMove === 1);

			let result = (stone || paper || scissors);
			this.winner = result ? 'You' : 'Computer';
			this.isOpen = true;
			this.playSound(result ? 'assets/win.wav' : 'assets/lose.wav');
		}
	}

}
