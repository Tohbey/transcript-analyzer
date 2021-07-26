import {JsonProperty} from 'json-object-mapper';

export default class Script {
  @JsonProperty()
  public channel!: number;
  @JsonProperty({ name: 'matching_line' })
  public matchingLine!: number;
  @JsonProperty({ name: 'matching_sentence' })
  public matchingSentence!: string | null;
  @JsonProperty()
  public order!: number;
  @JsonProperty()
  public sentence!: string | null;
  @JsonProperty()
  public similarity!: number;
  @JsonProperty()
  public timeFrom!: number | null;
  @JsonProperty()
  public timeTo!: number | null;

  constructor() {}
}
