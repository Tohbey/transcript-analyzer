import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ObjectMapper } from 'json-object-mapper';
import { Observable, of } from 'rxjs';

import CallServiceMock from 'src/app/core/services/mocks/call.service.mock';
import Call from '../models/call.model';
import Transcript from '../models/transcript.model';
import MOCK_DATA_CALLS from './mocks/data/calls.json';
import MOCK_DATA_TRANSCRIPT from './mocks/data/transcript.json';

@Injectable({ providedIn: 'root' })
export default class CallService extends CallServiceMock {

    constructor(private http: HttpClient) {
        super();
    }

    getCalls$(): Observable<Call[]> {
        return of(ObjectMapper.deserializeArray(Call, MOCK_DATA_CALLS));
    }

    getTranscripts$(): Observable<Transcript[]> {
        return of(ObjectMapper.deserializeArray(Transcript, MOCK_DATA_TRANSCRIPT));
    }
}
