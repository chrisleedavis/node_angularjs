module.exports = function(config) {
  config.set({
    frameworks: ["jasmine"],
	
    reporters: ["progress", "junit"],
	
	//files to be included with karma tests (ONLY IF RUNNING KARMA BY ITSELF, OTHERWISE - FILE LIST COMING FROM Gruntfile.js!!!!)
	files: []
  });
  
  config.LOG_DEBUG = true;
};