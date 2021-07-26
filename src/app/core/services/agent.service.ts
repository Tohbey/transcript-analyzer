import {Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http'
import AgentServiceMock from 'src/app/core/services/mocks/agent.service.mock';
import { Observable, of } from 'rxjs';
import Agent from '../models/agent';
import {ObjectMapper} from 'json-object-mapper';
import MOCK_DATA from './mocks/data/agents.json';


@Injectable({providedIn: 'root'})
export default class AgentService extends AgentServiceMock {
    
    constructor(private http:HttpClient){
        super();
    }

    getAgents$(): Observable<Agent[]> {
        return of(ObjectMapper.deserializeArray(Agent, MOCK_DATA));
    }
}
