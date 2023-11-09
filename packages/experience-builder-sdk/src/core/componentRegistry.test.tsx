import React from 'react';
import * as registry from './componentRegistry';
import { INTERNAL_EVENTS } from '../constants';
import { CONTENTFUL_SECTION_ID } from '../constants';
import { containerDefinition } from './definitions/components';
import { ComponentRegistration } from '../types';

jest.mock('../core/constants', () => ({
  SDK_VERSION: '0.0.0-test',
  __esModule: true,
}));

const TestComponent = () => {
  return <div data-test-id="test">Test</div>;
};

describe('component registration', () => {
  afterEach(() => {
    registry.resetComponentRegistry();
  });

  describe('getComponentRegistration', () => {
    it('should return undefined if requested id is not registered', () => {
      expect(registry.getComponentRegistration('random-str')).toBe(undefined);
    });

    it('should return container when given a section id', () => {
      expect(registry.getComponentRegistration(CONTENTFUL_SECTION_ID)?.definition).toEqual(
        containerDefinition
      );
    });
  });

  describe('defineComponents (many at once)', () => {
    it('should emit the registered components event', () => {
      jest.spyOn(window, 'dispatchEvent');

      const definitionId = 'TestComponent';

      registry.defineComponents([
        {
          component: TestComponent,
          definition: {
            id: definitionId,
            name: 'TestComponent',
            builtInStyles: [],
            variables: {
              isChecked: {
                type: 'Boolean',
              },
            },
          },
        },
      ]);

      const componentRegistration = registry.getComponentRegistration(definitionId);
      expect(componentRegistration).toBeDefined();
      expect(window.dispatchEvent).toHaveBeenCalledWith(
        new CustomEvent(INTERNAL_EVENTS.ComponentsRegistered)
      );
    });

    it('should apply fallback to group: content for variables that have it undefined', () => {
      const definitionId = 'TestComponent';

      registry.defineComponents([
        {
          component: TestComponent,
          definition: {
            id: definitionId,
            name: 'TestComponent',
            builtInStyles: [],
            variables: {
              isChecked: {
                type: 'Boolean',
              },
            },
          },
        },
      ]);

      const componentRegistration = registry.getComponentRegistration(definitionId);
      expect(componentRegistration).toBeDefined();
      expect(componentRegistration!.definition.variables.isChecked.group).toBe('content');
    });

    it('should add default built-in style variables', () => {
      const definitionId = 'TestComponent-1';

      registry.defineComponents([
        {
          component: TestComponent,
          definition: {
            id: definitionId,
            name: 'TestComponent',
            variables: {
              isChecked: {
                type: 'Boolean',
              },
            },
          },
        },
      ]);

      const componentRegistration = registry.getComponentRegistration(definitionId);
      expect(componentRegistration).toBeDefined();

      const variableKeys = Object.keys(componentRegistration!.definition.variables);
      expect(variableKeys).toContain('cfMargin');
    });

    it('should add specified built-in style variables', () => {
      const definitionId = 'TestComponent-2';

      registry.defineComponents([
        {
          component: TestComponent,
          definition: {
            id: definitionId,
            name: 'TestComponent',
            builtInStyles: ['cfPadding', 'cfBorder'],
            variables: {
              isChecked: {
                type: 'Boolean',
              },
            },
          },
        },
      ]);

      const componentRegistration = registry.getComponentRegistration(definitionId);
      expect(componentRegistration).toBeDefined();

      const variableKeys = Object.keys(componentRegistration!.definition.variables);
      expect(variableKeys).toContain('cfPadding');
      expect(variableKeys).toContain('cfBorder');
      expect(variableKeys).not.toContain('cfMargin');
    });

    it('should apply fallback to group: content for variables that have it undefined', () => {
      const definitionId = 'TestComponent';

      registry.defineComponents([
        {
          component: TestComponent,
          definition: {
            id: definitionId,
            name: 'TestComponent',
            builtInStyles: [],
            variables: {
              isChecked: {
                type: 'Boolean',
              },
            },
          },
        },
      ]);

      const definition = registry.getComponentRegistration(definitionId);
      expect(definition).toBeDefined();

      for (const variable of Object.values(definition!.definition.variables)) {
        expect(variable.group).toBe('content');
      }
    });
  });
});

describe('createDesignComponentRegistration', () => {
  let existingComponentRegistration: ComponentRegistration;
  beforeEach(() => {
    existingComponentRegistration = {
      component: jest.fn(),
      definition: {
        id: 'existing-definition-id',
        name: 'Existing Definition',
        variables: {},
        children: true,
        category: 'Design Components',
      },
    };
    registry.addComponentRegistration(existingComponentRegistration);
  });

  afterEach(() => {
    registry.resetComponentRegistry();
  });

  it('should return an existing component registration object if one already exists with the given definition ID', () => {
    const definitionId = 'existing-definition-id';
    const component = jest.fn();
    const addComponentRegistrationMock = jest.spyOn(registry, 'addComponentRegistration');

    const result = registry.createDesignComponentRegistration({ definitionId, component });

    expect(result).toBe(existingComponentRegistration);
    expect(addComponentRegistrationMock).not.toHaveBeenCalled();
  });

  it('should add a new component registration to the component registry', () => {
    const definitionId = '123';
    const component = jest.fn();
    const addComponentRegistrationMock = jest.spyOn(registry, 'addComponentRegistration');

    const result = registry.createDesignComponentRegistration({ definitionId, component });

    expect(result).toEqual({
      component,
      definition: {
        id: definitionId,
        name: 'Design Component',
        variables: {},
        children: true,
        category: 'Design Components',
      },
    });
    expect(addComponentRegistrationMock).toHaveBeenCalled();
  });
});
