import Route from '@ember/routing/route';
import RouteQueryManager from "ember-apollo-client/mixins/route-query-manager";

import query from 'fortnight/gql/queries/campaign/creative';

export default Route.extend(RouteQueryManager, {
  model({ creative_id }) {
    const campaignId = this.modelFor('portal.campaigns.manage').id
    const input = { campaignId, creativeId: creative_id };
    const variables = { input };
    return this.get('apollo').watchQuery({ query, variables, refetchPolicy: 'network-only' }, 'campaignCreative');
  },

  setupController(controller, model) {
    this._super(controller, model);
    controller.set('campaign', this.modelFor('portal.campaigns.manage.materials'));
  },
});
