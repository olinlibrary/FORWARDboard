db.getCollection('tags').update({}, { $rename: { 'old': 'new' } }, {multi: true} )