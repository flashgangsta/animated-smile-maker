import {MediaFile} from "./models/MediaFile.js";
import {TimelineLayersLayer} from "./interface/timeline/TimelineLayersLayer.js";

export class ProjectConfig extends EventTarget {
	static instance;

	#library = [];
	#lastImports;
	#timeline = {
		layers: []
	};

	constructor() {
		if (!ProjectConfig.instance) {
			super();
			ProjectConfig.instance = this;
		}
		return ProjectConfig.instance;
	}


	static getInstance() {
		return new ProjectConfig();
	}


	loadProject(config) {
		this.dispatchEvent(new Event("PROJECT_OPEN"));

		const library = config.library;
		if(library && library.length) {
			const mediaFilesList = library.map((fileModel) => {
				const mediaFile = new MediaFile();
				mediaFile.write(fileModel);
				return mediaFile;
			});

			this.pushLibraryMedia(...mediaFilesList);
		}

		const timeline = config.timeline;
		if(timeline && timeline.layers && timeline.layers.length) {
			const layers = timeline.layers;
			this.#clearTimelineData();

			layers.forEach((layerData) => {
				const layer = new TimelineLayersLayer(layerData.id, layerData.label);
			})
			this.dispatchEvent(new Event("PROJECT_LAYERS_INIT"));
		}
	}


	pushLibraryMedia(...mediaFiles) {
		this.#library.push(...mediaFiles);
		this.#lastImports = [...mediaFiles];
		this.dispatchEvent(new Event("MEDIA_IMPORTED"));
	}


	removeLibraryMedia(mediaFile) {
		const index = this.#library.findIndex((el) => el.name === mediaFile.name);
		this.#library.splice(index, 1);
		mediaFile.dispose();
	}


	get lastImports() {
		return this.#lastImports;
	}


	toString() {
		return JSON.stringify({
			library: this.#library.map(el => el.serializeObject()),
			timeline: {
				layers: this.libraryLayers.map((el) => el.serializeObject())
			}
		});
	}


	get layersLength() {
		return this.libraryLayers.length;
	}


	get libraryLayers() {
		return this.#timeline.layers;
	}


	pushLibraryLayer(layer) {
		this.libraryLayers.push(layer);
	}


	removeLibraryLayer(layer) {
		const index = this.libraryLayers.findIndex((el) => el.id === layer.id);
		this.libraryLayers.splice(index, 1);
	}


	#clearTimelineData() {
		this.#timeline = {
			layers: [],
		}
	}

}