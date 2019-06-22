"use strict";

class Term {
    constructor(name, value) {
      this._name = name;
      this._value = value;
    }

    set name(name)
    {
        this._name = name;
    }
    get name()
    {
        return this._name;
    }

    set value(value)
    {
        this._value = value;
    }
    get value()
    {
        return this._value;
    }
}
module.exports = Term;