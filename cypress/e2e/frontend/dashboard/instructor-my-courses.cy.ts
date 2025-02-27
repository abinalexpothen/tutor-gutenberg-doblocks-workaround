import { frontendUrls } from '../../../config/page-urls';

describe('Tutor Dashboard My Courses', () => {
  beforeEach(() => {
    cy.visit(`${Cypress.env('base_url')}${frontendUrls.dashboard.MY_COURSES}`);
    cy.loginAsInstructor();
    cy.url().should('include', frontendUrls.dashboard.MY_COURSES);
  });

  it('should create a new course', () => {
    cy.intercept('POST', `${Cypress.env('base_url')}/wp-admin/admin-ajax.php`).as('ajaxRequest');

    cy.get('a#tutor-create-new-course').click();

    cy.wait('@ajaxRequest').then((interception) => {
      expect(interception.response?.body.success).to.equal(true);
    });

    cy.get('button[name=course_submit_btn]').click();

    // cy.get("a[title=Exit]").click()

    // <ul class="tutor-nav">
    // 		<li class="tutor-nav-item">
    // 			<a class="tutor-nav-link is-active" href="http://localhost:8888/wordpress-tutor/dashboard/reviews">
    // 				Received (0)
    // 			</a>
    // 		</li>
    // </ul>

    cy.get('.tutor-nav').then(() => {
      cy.get('.tutor-nav-item')
        .eq(1)
        .click()
        .then(() => {
          cy.get('.tutor-nav-link').eq(0).click();
        });
    });

    cy.get('.tutor-dashboard-menu-item.tutor-dashboard-menu-index').contains('Dashboard').click();
    cy.url().should('include', frontendUrls.dashboard.DASHBOARD);
    cy.visit(`${Cypress.env('base_url')}/${frontendUrls.dashboard.MY_COURSES}`);
  });

  it('should draft and publish again a course', () => {
    // Draft a course
    cy.get('.tutor-card-footer button[action-tutor-dropdown=toggle]').eq(0).click();
    cy.get('.tutor-dropdown-parent.is-open a').contains('Move to Draft').click();
    cy.url().should('include', 'draft-courses');

    // Publish a course from draft again
    cy.get('.tutor-card-footer button[action-tutor-dropdown=toggle]').eq(0).click();
    cy.get('.tutor-dropdown-parent.is-open a').contains('Publish').click();
    cy.url().should('not.include', 'draft-courses');
    cy.url().should('include', 'my-courses');
  });

  it('should duplicate a course', () => {
    let draftAmount = '';
    cy.get('a.tutor-nav-link')
      .contains('Draft')
      .invoke('text')
      .then((text) => {
        draftAmount = text;
      });

    cy.get('.tutor-card-footer button[action-tutor-dropdown=toggle]').eq(0).click();
    cy.get('.tutor-dropdown-parent.is-open a').contains('Duplicate').click();
    cy.get('a.tutor-nav-link').contains('Draft').invoke('text').should('not.equal', draftAmount);
  });

  it('should delete a course', () => {
    cy.intercept('POST', `${Cypress.env('base_url')}/wp-admin/admin-ajax.php`).as('ajaxRequest');

    cy.get('.tutor-card-footer button[action-tutor-dropdown=toggle]').eq(0).click();
    cy.get('.tutor-dropdown-parent.is-open a').contains('Delete').click();
    cy.get('.tutor-modal.tutor-is-active button').contains('Yes, Delete This').click();

    cy.wait('@ajaxRequest').then((interception) => {
      expect(interception.response?.body.success).to.equal(true);
    });
  });
});
