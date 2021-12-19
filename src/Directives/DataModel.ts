/*
 * Copyright 2021 LABOR.digital
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * Last modified: 2021.08.04 at 12:47
 */

import type {AbstractBit} from '@labor-digital/bits';
import {setElementValue} from '@labor-digital/bits';
import {noChange} from 'lit-html';
import {AsyncDirective} from 'lit-html/async-directive.js';
import {directive, Part, PartType} from 'lit-html/directive.js';
// import {directive, EventPart} from 'lit-html';

declare global
{
    interface Element
    {
        _bitHtmlListener?: boolean;
    }
}

class DataModelDirective extends AsyncDirective
{
    protected _part?: Part;
    
    public update(_part: Part, props: Array<unknown>): any
    {
        this._part = _part;
        return super.update(_part, props);
    }
    
    public render(property: string): unknown
    {
        this.registerHooks(property);
        return noChange;
    }
    
    protected registerHooks(property: string): void
    {
        if (!this._part || this._part.type !== PartType.EVENT) {
            throw new Error(
                'dataModel can only be used in event bindings! Use it like: @keyup="${dataModel(\'yourProperty\')}"');
        }
        
        if (this._part.element._bitHtmlListener) {
            return;
        }
        
        let handler: Function = function () {};
        this._part.element._bitHtmlListener = true;
        this.setValue(function (e: any) {
            handler(e);
        });
        
        const bit: AbstractBit = this._part.options?.host as any;
        bit.$context.binder.getAccessor(property).then(prop => {
            if (prop === null || !this._part || this._part.type !== PartType.EVENT) {
                return;
            }
            
            const el = this._part.element as HTMLElement;
            
            setElementValue(this._part.element as HTMLElement, prop.get());
            handler = function (e: UIEvent | KeyboardEvent) {
                bit.$context.binder.reactToChangeEvent(e, el, prop);
            };
        });
    }
}

/**
 * Directive to simplify two-way data binding on form elements.
 *
 * You simply bind it to the input event it should listen for (change/keydown for the most part)
 * and tell it which property you want to bind it to.
 *
 * The binding will then update the input value in the same way data-model would.
 *
 * You can also use @context if you would really want to.
 *
 * Example:
 * <label>
 *   Edit your two way binding<br>
 *   <input type="text" @keyup="${dataModel('data.model')}">
 * </label>
 */
export const dataModel = directive(DataModelDirective);