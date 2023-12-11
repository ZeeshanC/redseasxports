import { environment } from "src/environments/environment";
import { ApiService } from "../api/api.service";
import { UtilService } from "../util/util.service";
import { Injectable } from '@angular/core';
import { IUser } from "../../models/user.model";
import { HttpBackend, HttpClient, HttpHeaders } from "@angular/common/http";

declare const FB: any;

@Injectable({
  providedIn: 'root'
})
export class CampaignService {
  constructor(
    private util: UtilService,
    private api: ApiService,
    private handler: HttpBackend
  ) {
    this.httpClient = new HttpClient(handler);
  }
  private httpClient: HttpClient | any;
  entityId: any;
  draftParams = 'media;beneficiaryname;beneficiaryrelation;beneficiaryage;disease;manager.entity;rewards;beneficiary;about;shortdescription;cause;owner;hospital;patientNumber;owner.qualification;owner.occupation;owner.salary;kBankCampaignType';
  beneficiaryImage: any;
  leaderBoardImage: any;
  youTubeVideo: any;

  getCampaignDraftKbank(draftId: any, relation?: any) {
    this.getEntityId();
    let passRelation = relation ? `;${relation}` : '';

    const url = environment.APP.API_URLS.GET_CAMPAIGN_DRAFT_DETAILS_KBANK(this.entityId, draftId);
    return this.api.get(url + '?with=' + this.draftParams + passRelation);
  }

  getEntityId() {
    const data = this.util.storage.get(`${this.util.vars.user_data_key}`);
    this.entityId = data.id;
  }
  getCauses(id: any) {
    const url = environment.APP.API_URLS.GET_CAUSES;
    return this.api.get(url + id + '?with=child');
  }

  uploadEditorImage(data: any, id: any) {
    const url = environment.APP.API_URLS.UPLOAD_EDITOR_IMAGE(id);
    return this.api.post(url, data, 'file');
  }

  uploadImageLeaderboardKBank(data: any, id: any) {
    const url = environment.APP.API_URLS.UPLOAD_LEADERBOARD_IMAGE_KBANK(id);
    return this.api.post(url, data, 'file');
  }
  deletMediaKbank(draftId: any, mediaId: any) {
    const url = environment.APP.API_URLS.DELETE_LEADERBOARD_IMAGE_KBANK(draftId, mediaId);
    return this.api.delete(url);
  }

  uploadImageBeneficiary(data: any, id: any) {
    const url = environment.APP.API_URLS.UPLOAD_BENEFICIARY_IMAGE(id);
    return this.api.post(url, data);
  }
  uploadYoutubeVideoKbank(data: any, draftId: any) {
    const url = environment.APP.API_URLS.UPLOAD_YOUTUBE_VIDEO_KBANK(draftId);
    return this.api.post(url, data);
  }
  updateKbankCampaign(data: any, id: any) {
    const url = environment.APP.API_URLS.UPDATE_CAMPAIGN_KBANK(id);
    return this.api.put(url, data);
  }
  createCampaign(data: any) {
    if (this.util.vars.isFOS) {
      const userdata: IUser = this.util.storage.get(`${this.util.vars.user_data_key}`);
      data['creator_entity_details_id'] = userdata.id;
    }
    const url = environment.APP.API_URLS.CREATE_NEW_CAMPAIGN(data.parent_cause_id);
    return this.api.post(url, data);
  }
  publishCampaignKbank(data: any, draftId: any) {
    const url = environment.APP.API_URLS.PUBLISH_CAMPAIGN_KBANK(draftId);
    return this.api.put(url, data);
  }
  meiliSearchFindDisease(data: any) {
    const url = environment.meilisearch.host + '/indexes/' + environment.meilisearch.disease.index + '/search';
    const token = environment.meilisearch.key;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const payload = {
      "q": data,
      "facets": [],
      "attributesToHighlight": [
        "*"
      ],
      "highlightPreTag": "__ais-highlight__",
      "highlightPostTag": "__/ais-highlight__",
      "limit": 21,
      "offset": 0
    }
    return this.httpClient.post(url, payload, { headers });
  }
  meiliSearchFindHospital(data: any) {
    const url = environment.meilisearch.host + '/indexes/' + environment.meilisearch.hospital.index + '/search';
    const token = environment.meilisearch.key;
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
    const payload = {
      "q": data,
      "facets": [],
      "attributesToHighlight": [
        "*"
      ],
      "highlightPreTag": "__ais-highlight__",
      "highlightPostTag": "__/ais-highlight__",
      "limit": 21,
      "offset": 0
    }
    return this.httpClient.post(url, payload, { headers });
  }

  getFacebookImages(id: any) {
    FB.api('/' + id + '/albums?fields=id,name', (response: any) => {
      return response;
    });
  }

  changeCampaignStatusKbank(data: any) {
    this.getEntityId();
    const url = environment.APP.API_URLS.CHANGE_CAMPAIGN_STATUS_KBANK(this.entityId, this.util.vars.campaign_id);
    return this.api.put(url, data);
  }
}