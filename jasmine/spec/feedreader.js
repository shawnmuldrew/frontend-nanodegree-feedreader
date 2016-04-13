/* feedreader.js
 *
 * Jasmine spec file for testing feedreader application
 */

$(function() {
  /* This suite is for the RSS feeds definitions, the allFeeds variable in our application. */
  describe('RSS Feeds', function() {
    /* Tests to make sure that the allFeeds variable has been defined and that it is not empty. */
    it('are defined', function() {
      expect(allFeeds).toBeDefined();
      expect(allFeeds.length).not.toBe(0);
    });


    /* Test that loops through each feed in the allFeeds object and checks that it has a URL defined
     * and that the URL is not empty.
     */
    it('feed urls defined and not empty', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.url).toBeDefined();
        expect(feed.url.length).not.toBe(0);
      });
    });

    /* Test loops through each feed in the allFeeds object and checks that it has a name defined
     * and that the name is not empty.
     */
    it('feed names defined and not empty', function() {
      allFeeds.forEach(function(feed) {
        expect(feed.name).toBeDefined();
        expect(feed.name.length).not.toBe(0);
      });
    });
  });


  /* Test suite for the Menu conponent of the application */
  describe('The Menu', function() {

    /* Test checks the menu element is hidden by default.  */
    it('menu element hidden', function() {
      expect(document.body.classList).toContain('menu-hidden');
    });

    /* Test checks the menu changes visibility when the menu icon is clicked. 
     *
     * By clicking the menu it will toggle between hidden and visible. 
     */
    it('menu element changes visibility', function() {
      $('a.menu-icon-link').trigger('click');
      expect(document.body.classList).not.toContain('menu-hidden');
      $('a.menu-icon-link').trigger('click');
      expect(document.body.classList).toContain('menu-hidden');
    });

  });

  /* Test suite for Feed Reader entries when application first loads */
  describe('Initial Entries', function() {
    beforeEach(function(done){
      $('.feed').empty();
      loadFeed(0, function(){
        done();
      });
    });

    /* Test checks that when the loadFeed function is called and completes its work, there is at least
     * a single .entry element within the .feed container. As loadFeed() is asynchronous this test requires
     * the use of Jasmine's beforeEach and asynchronous done() function.
     *
     * Checks for more than zero entries for first feed
     */
    it('feed contains at least one element', function() {
      expect($('.entry').length).toBeGreaterThan(0);
    });

  });

  /* Test suite for Feed Selection */
  describe('New Feed Selection', function() {
    var firstFeedHeader,
        secondFeedHeader;

    beforeEach(function(done){
      $('.feed').empty();
      loadFeed(0, function(){
        firstFeedHeader = $('.feed').contents().find("h2").html();
        loadFeed(1, function() {
          secondFeedHeader = $('.feed').contents().find("h2").html();
          done();
        });
      });
    });

    /* Test checks when a new feed is loaded by the loadFeed function that the content actually changes.
     * Note: loadFeed() is asynchronous.
     *
     * The asynchronous loadFeed calls are nested with the done callback in the second call to ensure both return 
     * the feed entries prior to testing whether the feeds are different. A failure test can be performed by 
     * setting both calls to the same feed.
     */
    it('loading new feed changes the content', function(){
      expect(firstFeedHeader).not.toEqual(secondFeedHeader);
    });
  });

}());
