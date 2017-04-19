import { Component } from '@angular/core';
import { Http, Response } from '@angular/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs/Rx';
import 'rxjs/add/operator/map';

const API_TOKEN = 'AIzaSyB_Yjv9XZbmCIWtzooN1jBkcH5l_8Yqb98';
const BASE_URL = 'https://www.googleapis.com/youtube/v3/search';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css']
})


export class AppComponent {
	searchResults;

	constructor (private http: Http){}

	public youtubeSearchByKeyword(keyword) {
		console.log("YouTube search by keyword called with keyword : " + keyword);
		var query = 'test';
		this.http.get(`${BASE_URL}?q=${keyword}&part=snippet&key=${API_TOKEN}`)
		.map(res => res.json())
		.subscribe(searchResults => this.searchResults = searchResults);
	}
}
