'use strict';

var mongoose = require('mongoose'),
    Thing = mongoose.model('Thing'),
    request = require('request'),
    parseString = require('xml2js').parseString;

/**
 * Get awesome things
 */
exports.itineraries = function(req, res) {
  request({
    url: 'https://www.concursolutions.com/api/travel/trip/v1.1',
    headers: {
      Authorization: 'OAuth bKjUcQDDNoslItMvhelB/MVaBbw=',
      Accept: 'application/json'
    }
  }, function (error, response, body) {
    if (!error) {
      request({
        url: JSON.parse(body)[0].id,
        headers: {
          Authorization: 'OAuth bKjUcQDDNoslItMvhelB/MVaBbw=',
          Accept: 'application/json'
        }
      }, function (error, response, body) {
        if (error) throw error;
        else parseString(body, function (err, result) {
          if (!err) res.send(result);
          else throw err;
        });
      });
    } else {
      throw error;
    }
  });
};

exports.gettyImages = function (req, res) {
  request.post('https://connect.gettyimages.com/oauth2/token/',
    {form: {
      client_id: 'chx8ak2qjfp893jhzfy6gfjm',
      client_secret: 'RJMWZek5KCFDuthdbk5TQMaszT2Gh6HCDMDJYVfu89zcP',
      grant_type: 'client_credentials'
    }
  }, function (error, response, body) {
    request.post('https://connect.gettyimages.com/v2/search/SearchForImages',
      {json: {
        RequestHeader: {
          Token: JSON.parse(body).access_token,
        },
        SearchForImagesRequestBody: {
          Filter: {
            ImageFamilies: ['Creative']
          },
          Query: {
            SearchPhrase: req.body.search
          },
          ResultOptions: {
            ItemCount: 75,
            ItemStartNumber: 1,
            IncludeKeywords: false,
            RefinementOptionsSet: "",
            EditorialSortOrder: "",
            CreativeSortOrder: "MostPopular"
          }
        },
      }
    }, function (error, response, body) {
      if (!error) res.send(body.SearchForImagesResult.Images);
      else throw error;
    });
  });
};
