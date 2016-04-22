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
        it('are defined', function() {
            expect(allFeeds).toBeDefined();
            expect(allFeeds.length).not.toBe(0);
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a URL defined
         * and that the URL is not empty.
         */
        
        it('have defined URLS and not empty', function() {
           for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].url).toBeDefined();
                expect(allFeeds[i].url.length).not.toBe(0);
            };
        });


        /* TODO: Write a test that loops through each feed
         * in the allFeeds object and ensures it has a name defined
         * and that the name is not empty.
         */
        
        it('has defined names and not empty', function() {
            for (var i = 0; i < allFeeds.length; i++) {
                expect(allFeeds[i].name).toBeDefined();
                expect(allFeeds[i].name.length).not.toBe(0);
            };
        });

        /* Extra Test 
        * Test to be able to add a feed 
        */
        
        it('should be able to add a new feed', function() {
            var allFeedsLength = allFeeds.length;
            var newFeed = {
                name: "A new feed",
                url: "http://www.newsfeed.com/rss"
            };
            addFeed(newFeed);
            expect(allFeeds.length).toEqual(allFeedsLength + 1);
            expect(allFeeds[allFeeds.length - 1].url).toEqual(newFeed.url);
            expect(allFeeds[allFeeds.length - 1].namd).toEqual(newFeed.name);
        });

    });


    /* TODO: Write a new test suite named "The menu" */
    describe('The menu', function() {
        var $body;
        beforeEach(function () {
            $body = $("#body");
        });

        /* TODO: Write a test that ensures the menu element is
        * hidden by default. You'll have to analyze the HTML and
        * the CSS to determine how we're performing the
        * hiding/showing of the menu element.
        */
        
        it('is hidden by default', function() {
            expect($body.attr('class')).toEqual('menu-hidden');
        });

         /* TODO: Write a test that ensures the menu changes
          * visibility when the menu icon is clicked. This test
          * should have two expectations: does the menu display when
          * clicked and does it hide when clicked again.
          */
         
        it('should toggle when clicked', function() {
            var $menuIcon = $('.menu-icon-link').click();
            $menuIcon.click();
            expect($body.attr('class')).not.toEqual('menu-hidden');
            $menuIcon.click();
            expect($body.attr('class')).toEqual('menu-hidden');
        });

    });
    /* TODO: Write a new test suite named "Initial Entries" */

    describe('Initial Entries', function() {
        beforeEach(function (done) {
            loadFeed(1, function() {
                done();
            });
        });

        /* TODO: Write a test that ensures when the loadFeed
         * function is called and completes its work, there is at least
         * a single .entry element within the .feed container.
         * Remember, loadFeed() is asynchronous so this test will require
         * the use of Jasmine's beforeEach and asynchronous done() function.
         */
        
        it('should have at least one entry', function (done) {
            $entries = $('.feed').find('.entry');
            expect($entries.length).toBeGreaterThan(0);
            done();
        });
    });
    /* TODO: Write a new test suite named "New Feed Selection" */

    describe('New Feed Selection', function() {
        var existingEntryText;
        beforeEach(function (done) {
            loadFeed(2, function() {
                existingEntryText = $('.feed').find('.entry')[0].innerHTML;
            });
            loadFeed(1, function() {
                done();
            });
        });

        /* TODO: Write a test that ensures when a new feed is loaded
         * by the loadFeed function that the content actually changes.
         * Remember, loadFeed() is asynchronous.
         */
        it('should change content when new content is loaded', function (done) {
            var newEntryText = $('.feed').find('.entry')[0].innerHTML;
            expect(newEntryText).not.toEqual(existingEntryText);
            done();
        });
    });
}());