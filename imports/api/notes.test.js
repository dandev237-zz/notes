import {Meteor} from 'meteor/meteor';
import expect from 'expect';

import {Notes} from './notes';

if(Meteor.isServer)
{
    describe('notes', function() {
       it('should insert new note', function() {
           const testUserId = 'testid';

           //Call the meteor method from the test case (passing in a userId)
           const _id = Meteor.server.method_handlers['notes.insert'].apply({ testUserId });

           expect(Notes.findOne({ _id, testUserId })).toExist();
       });

       it('should not insert a note if not authenticated', function() {
           expect(() => {
               Meteor.server.method_handlers['notes.insert']()
           }).toThrow();
       });
    });
}