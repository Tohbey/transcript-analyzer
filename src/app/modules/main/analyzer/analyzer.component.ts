import { AfterViewInit, ChangeDetectionStrategy, Component, Input, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import AgentFacade from 'src/app/core/facades/agent.facade';
import CallFacade from 'src/app/core/facades/call.facade';
import Call from 'src/app/core/models/call.model';
import Script from 'src/app/core/models/script.model';
import Transcript from 'src/app/core/models/transcript.model';

import TemplateService from 'src/app/core/services/template.service';
import { MainModule } from '../main.module';

@Component({
  selector: 'app-analyzer',
  templateUrl: './analyzer.component.html',
  styleUrls: ['./analyzer.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export default class AnalyzerComponent implements OnInit, AfterViewInit {
  @ViewChild('subHeader')
  private subHeader?: TemplateRef<any>;
  public dataSource: any[] = [];
  public dataSourceRep: any[] = [];
  sensitivity: number = 38
  matchedSentenceHovered: any;
  callDetails!: Transcript;
  expectedSimilarity!: number;
  realSimilarity!: number;
  matchingPercentage!: number;

  constructor(
    public agents: AgentFacade,
    public calls: CallFacade,
    private _tplService: TemplateService,
    private _router: Router
  ) {
  }

  public ngAfterViewInit(): void {
    this._tplService.register('subHeader', this.subHeader);
    this.calls.matchingPercentage$.subscribe((data) => {
      this.matchingPercentage = data
      if(this.matchingPercentage > 1){
        this.updateExpectedSimilarity(this.matchingPercentage);
        this.updateRealSimilarity(this.matchingPercentage);
      }
    })
  }

  public ngOnInit(): void {
    this.dataSource = MOCK_DATA();
    this.dataSourceRep = MOCK_DATA().slice(-25);
    this.updateExpectedSimilarity(38);
    this.updateRealSimilarity(38);
  }

  public selectAgent(event: any): void {
    this.agents.setActiveAgent(event.target?.value);
  };

  public selectCall(event: any): void {
    this.calls.selectCall(event.target?.value);
  }

  updateExpectedSimilarity(sensitivity: number) {
    let scriptCount = 0;
    this.calls.activeTranscript$.subscribe((data) => {
      scriptCount = data.script.length;
    })
    let coveredScript = 0;
    this.calls.activeTranscript$.subscribe((data) => {
      coveredScript = data.transcript
      .filter(x => x.similarity * 100 >= sensitivity)
      .length

      this.expectedSimilarity = Math.round(scriptCount / coveredScript * 100)
    })
  }

  updateRealSimilarity(sensitivity: number) {
    let scriptCount = 0;
    this.calls.activeTranscript$.subscribe((data) => {
      scriptCount = data.script.length;
    })
    let coveredScript = 0;
    this.calls.activeTranscript$.subscribe((data) => {
      coveredScript = data.transcript
      .filter(x => x.similarity * 100 >= sensitivity).length

      this.realSimilarity = Math.round(scriptCount / coveredScript * 100)
    })

  }
}

const MOCK_DATA = () => {
  const DATA: any[] = [];
  const SPEAKERS: string[] = [
    'Harvey',
    'Luke'
  ];

  let currentTime = 30;

  for (let i = 0; i < 100; i++) {
    const min = Math.floor(currentTime / 60);
    const sec = Math.floor(currentTime - min * 60);

    DATA.push({
      time: `${(
        '0' + min
      ).slice(-2)}:${(
        '0' + sec
      ).slice(-2)}`,
      speaker: SPEAKERS[Math.floor(Math.random() *
        (
          SPEAKERS.length
        ))],
      sentence: `This is a sample sentence #${i + 1}`
    });

    currentTime +=
      (
        Math.random() * 10
      ) + 5;
  }

  return DATA;
};
