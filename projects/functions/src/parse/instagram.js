const vm = require('vm');

const sandbox = { window: {} };
vm.createContext(sandbox);

module.exports = () => {
  return {
    instagram: [
      ({ htmlDom: $ }) => {
        const element = $('body script[type="text/javascript"]');
        const instagram = {};
        element.each((i, elem) => {
          const content = $(elem).html();
          if (content.indexOf('window._sharedData = ') !== -1) {
            vm.runInContext(content, sandbox);
            // eslint-disable-next-line no-underscore-dangle
            const post = sandbox.window._sharedData.entry_data.PostPage[0].graphql.shortcode_media;
            instagram.location = {
              id: post.location.id,
              name: post.location.name,
              slug: post.location.slug,
              public: post.location.has_public_page,
            };
            instagram.image = post.display_url;
            instagram.id = post.id;
            instagram.owner = {
              id: post.owner.id,
              username: post.owner.username,
              name: post.owner.full_name,
              avatar: post.owner.profile_pic_url,
            };
            instagram.likes = parseInt(post.edge_media_preview_like.count, 10);
          }
        });

        return instagram;
      },
    ],
  };
};
