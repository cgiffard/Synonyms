#!/usr/bin/env node

var	synonymCLI	= require("commander"),
	colors		= require("colors"),
	natural		= require("natural"),
	util		= require("util"),
	packageInfo	= require("./package.json"),
	wordnet		= new natural.WordNet();

synonymCLI
	.version(packageInfo.version)
	//.option("-d --definition","Show example sentences/definitions")
	.parse(process.argv);

synonymCLI.args.forEach(lookupSynonyms);

function lookupSynonyms(synonym) {
	wordnet.lookup(synonym, function(results) {
		console.log(synonym.yellow);
		
		var synonymList = results.reduce(function(prev,result) {
			return prev.concat(result.synonyms)
		},[]);
		
		console.log("\t" + synonymList.join(" ") + "\n");
	});
}