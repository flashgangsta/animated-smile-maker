export class ProjectConfig {
	static instance;

	constructor() {
		if (!ProjectConfig.instance) {
			ProjectConfig.instance = this;
		}

		return ProjectConfig.instance;
	}


	static getInstance() {
		return new ProjectConfig();
	}
}