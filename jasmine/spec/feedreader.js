/* feedreader.js
 *
 * This is the spec file that Jasmine will read and contains
 * all of the tests that will be run against your application.
 */

/* We're placing all of our tests within the $() function,
 * since some of these tests may require DOM elements. We want
 * to ensure they don't run until the DOM is ready.
 */
$(function() {
    /* This is our first test suite - a test suite just contains
    * a related set of tests. This suite is all about the RSS
    * feeds definitions, the allFeeds variable in our application.
    */
    describe('RSS Feeds', function() {
        /* This is our first test - it tests to make sure that the
         * allFeeds variable has been defined and that it is not
         * empty. Experiment with this before you get started on
         * the rest of this project. What happens when you change
         * allFeeds in app.js to be an empty array and refresh the
         * page?
         */
        it('are defined and not empty', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
            expect(allFeeds instanceof Array).toBeTruthy();
        });


        /* Test that ensures each allFeeds object has a URL defined
         * and that the URL is not empty.
         */

        it('have defined URLs and not empty', function() {
            var allFeedsUrl = true;
            for(i = 0; i < allFeeds.length; i++) {
                if(allFeeds[i].url.length === 0) {
                    allFeedsUrl = false;
                    break;
                }
                else{
                  expect(allFeeds[i].url).toBeDefined();
                  expect(allFeeds[i].url).toMatch(/^http(s?)\:\/\//);
                }
            }

            expect(allFeedsUrl).toBe(true);
        });

        /* Test that ensures each allFeeds object has a name defined
         * and that the name is not empty.
         */

        it('have defined names and not empty', function() {
            var allFeedsNm = true;
            for(i = 0; i < allFeeds.length; i++) {
                if(allFeeds[i].name.length === 0) {
                    allFeedsNm = false;
                    break;
                }
                else {
                  expect(allFeeds[i].name).toBeDefined();
                  expect(typeof allFeeds[i].name).toBe('string');
                }
            }

            expect(allFeedsNm).toBe(true);
        });
    });


    /* Test suite for the menu */

    describe('The menu', function() {

        /* Test that ensures the menu element is hidden by default.
         */

        it('is hidden by default', function() {
            expect($('body').attr('class')).toBe('menu-hidden');
        });

         /* Test that ensures the menu changes
          * visibility when the menu icon is clicked.
          */

        it('should toggle from view menu icon is clicked', function() {

            $('a.menu-icon-link').trigger('click');
            expect($('body').attr('class')).not.toBe('menu-hidden');

            $('a.menu-icon-link').trigger('click');
            expect($('body').attr('class')).toBe('menu-hidden');
        });
    });


    /* Test suite for the initial entry */

    describe('Initial Entries', function() {

        /* Test that ensures there is at least a single .entry element 
         * within the .feed container when the loadFeed function is called 
         * and completes its work.
         */

        beforeEach(function(done) {
          loadFeed(0, done);
        });

        it('there is at least a single entry', function() {
            expect($('.entry').length).toBeGreaterThan(0);
        });

    });


    /* Test suite for new feeds */

    describe('New Feed Selection', function() {

        /* Test that ensures the content actually changes
         * when a new feed is loaded.
         */

        var currEntry, newEntry;

        beforeEach(function(done) {
          loadFeed(0, function() {
            currEntry = $('.feed').text();

            loadFeed(1, function() {
              newEntry = $('.feed').text();
              done();
            });

          });

        });

        it('a new feed is loaded', function() {
            expect(newEntry).not.toBe(currEntry);
        });
    });
});