import { Component, OnInit } from '@angular/core';
import { MessageService } from '../message.service';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {

  /*
		Angular will inject the singleton 
		MessageService into this property when 
		it creates the MessagesComponent.

		property must be public because 
		you're going to bind to it in the template - 
		Angular only bind to public component properties
  */
  constructor(public messageService: MessageService) { }

  ngOnInit() {
  }

}
