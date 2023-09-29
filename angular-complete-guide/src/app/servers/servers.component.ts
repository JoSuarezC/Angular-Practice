import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-servers',
  templateUrl: './servers.component.html',
  styleUrls: ['./servers.component.css']
})
export class ServersComponent implements OnInit {
  allowNewServer: boolean = true;
  serverCreationStatus: string = "No server was created!";
  serverName: string = 'TestServer';
  isServerCreated: boolean = false;
  servers = [
    'Test1',
    'Test2'
  ]

  constructor() { }

  ngOnInit(): void {
  }

  onCreateServer(): void {
    this.serverCreationStatus = `Server was created! ${this.serverName}`;
    this.isServerCreated = true;
    this.servers.push(this.serverName);
  }

  onUpdateServerName(event: Event): void {
    this.serverName = (<HTMLInputElement> event.target).value;
  }

}
