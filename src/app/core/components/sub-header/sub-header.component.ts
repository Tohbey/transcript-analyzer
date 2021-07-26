import { Component, OnChanges, OnInit, TemplateRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import AgentFacade from '../../facades/agent.facade';
import CallFacade from '../../facades/call.facade';
import Agent from '../../models/agent';
import Call from '../../models/call.model';
import Transcript from '../../models/transcript.model';
import AgentService from '../../services/agent.service';
import CallService from '../../services/call.service';

import TemplateService from '../../services/template.service';

@Component({
  selector: 'app-gc-sub-header',
  templateUrl: './sub-header.component.html',
  styleUrls: ['./sub-header.component.scss']
})
export default class SubHeaderComponent implements OnInit {
  agentForm!: FormGroup;
  agents!: Agent[];
  calls!: Call[];
  transcript!: Transcript;
  constructor(private _tplService: TemplateService,
    private formBuilder: FormBuilder,
    public agentState: AgentFacade,
    public callState: CallFacade,
    private agentService: AgentService, private callService: CallService) {
  }

  ngOnInit(): void {
    this.agentForm = this.formBuilder.group({
      agent: ['', Validators.required],
      call: ['', Validators.required]
    })
    this.getAgents();
    this.getCalls();
  }

  public selectAgent(event: any): void {
    this.agentState.setActiveAgent(event.target?.value);
  };

  public selectCall(event: any): void {
    this.transcript = this.callState.selectCall(event.target?.value);
  }

  getCalls(){
    this.callService.getCalls$().subscribe((data) => {
      this.calls = data;
    })
  }

  getAgents(){
    this.agentService.getAgents$().subscribe((data) => {
      this.agents = data;
    })
  }
  
  dateFormate(date:any){
    return new Date(date).toDateString()
  }
  get content(): TemplateRef<any> | null {
    return this._tplService.get('subHeader') || null;
  }
}
