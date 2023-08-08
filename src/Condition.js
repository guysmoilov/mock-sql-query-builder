import React from 'react';

const operators = ['=', '!=', '<', '>', '<=', '>='];

const Condition = ({ condition, onChange, level = 0, onRemove = undefined }) => {
  const containerStyle = {
    border: '1px solid black',
    padding: '10px',
    margin: '10px 0',
    marginLeft: `${20 * level}px`  // Indentation based on nesting level
  };

  if (!condition.type) {
    // Simple condition
    return (
      <div style={containerStyle}>
        <input
          value={condition.field || ''}
          onChange={e => onChange({ ...condition, field: e.target.value })}
          placeholder="Field"
        />
        <select
          value={condition.operator || '='}
          onChange={e => onChange({ ...condition, operator: e.target.value })}
        >
          {operators.map(op => <option key={op} value={op}>{op}</option>)}
        </select>
        <input
          value={condition.value || ''}
          onChange={e => onChange({ ...condition, value: e.target.value })}
          placeholder="Value"
        />
        <button onClick={onRemove}>
          Remove
        </button>
      </div>
    );
  } else if (condition.type === 'NOT') {
    return (
      <div style={containerStyle}>
        NOT
        <button onClick={onRemove}>
          Remove
        </button>
        <Condition
          condition={condition.condition || { field: '', operator: '=', value: '' }}
          onChange={newCond => onChange({ ...condition, condition: newCond })}
          level={level + 1}
        />
        <button onClick={() => onChange({
          ...condition, condition: { type: 'AND', conditions: [] }
        })}>
          Wrap AND Group
        </button>
        <button onClick={() => onChange({
          ...condition, condition: { type: 'OR', conditions: [] }
        })}>
          Wrap OR Group
        </button>
      </div>
    );
  } else {
    // Compound condition (AND/OR)
    return (
      <div style={containerStyle}>
        <select
          value={condition.type}
          onChange={e => onChange({ ...condition, type: e.target.value })}
        >
          <option value="AND">AND</option>
          <option value="OR">OR</option>
        </select>
        {onRemove !== undefined && <button onClick={onRemove}>Remove</button>}
        <div>
          {condition.conditions.map((cond, index) => (
            <div key={index}>
              <Condition
                condition={cond}
                onChange={newCond => {
                  const newConditions = [...condition.conditions];
                  newConditions[index] = newCond;
                  onChange({ ...condition, conditions: newConditions });
                }}
                level={level + 1}
                onRemove={() => {
                  const newConditions = [...condition.conditions];
                  newConditions.splice(index, 1);
                  onChange({ ...condition, conditions: newConditions });
                }}
              />
            </div>
          ))}
          <button onClick={() => onChange({
            ...condition, conditions: [...condition.conditions, { field: '', operator: '=', value: '' }]
          })}>
            Add Condition
          </button>
          <button onClick={() => onChange({
            ...condition, conditions: [...condition.conditions, { type: 'AND', conditions: [] }]
          })}>
            Add AND Group
          </button>
          <button onClick={() => onChange({
            ...condition, conditions: [...condition.conditions, { type: 'OR', conditions: [] }]
          })}>
            Add OR Group
          </button>
          <button onClick={() => onChange({
            ...condition, conditions: [...condition.conditions, { type: 'NOT', condition: { field: '', operator: '=', value: '' } }]
          })}>
            Add NOT Condition
          </button>
        </div>
      </div>
    );
  }
}

export default Condition;

