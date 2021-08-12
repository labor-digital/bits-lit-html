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
 * Last modified: 2021.08.04 at 12:46
 */

import type {ILitHtmlTemplateProvider} from './types';

declare module '@labor-digital/bits/dist/Core/AbstractBit'
{
    interface AbstractBit
    {
        /**
         * See the main implementation for additional features!
         *
         * Allows you to mount a reactively, rendered HTML template into the dom. The template is rendered using
         * lit-html, so you can use all natively supported features.
         *
         * The template will be rendered at the root of the bit mount component
         *
         * ATTENTION: While it is possible to use declarative data-binds using data-bind="..." in your template,
         * I would strongly recommend using the lit-html binding technic instead. For two-way data binding you should
         * take a look at the dataModel() that is provided by the package.
         *
         * WARNING: The mounted HTML is reactive! You don't have to re-render it every time a reactive property changed!
         * Call this method in the mounted() hook, or use the returned disposer function, to unbind the html first!
         *
         * @param template
         * @protected
         * @see https://lit-html.polymer-project.org/guide
         */
        $html(template: ILitHtmlTemplateProvider): void
        
        /**
         * See the main implementation for additional features!
         *
         * Allows you to mount a reactively, rendered HTML template into the dom. The template is rendered using
         * lit-html, so you can use all natively supported features.
         *
         * The template will be rendered as content of the provided target
         *
         * ATTENTION: While it is possible to use declarative data-binds using data-bind="..." in your template,
         * I would strongly recommend using the lit-html binding technic instead. For two-way data binding you should
         * take a look at the dataModel() that is provided by the package.
         *
         * WARNING: The mounted HTML is reactive! You don't have to re-render it every time a reactive property changed!
         * Call this method in the mounted() hook, or use the returned disposer function, to unbind the html first!
         *
         * @param target
         * @param template
         * @protected
         * @see https://lit-html.polymer-project.org/guide
         * @see html
         */
        $html(target: string | HTMLElement, template: ILitHtmlTemplateProvider): void
        
    }
    
}

export {LitHtmlPlugin} from './LitHtmlPlugin';
export {html, svg} from 'lit-html';
export {dataModel} from './Directives/DataModel';
export * from './types';