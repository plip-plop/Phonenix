import {
  apply,
  chain,
  mergeWith,
  move,
  Rule,
  strings,
  template,
  url,
} from '@angular-devkit/schematics';
import { Schema } from './schema';
export function stateService(options: Schema): Rule {
  return (tree, context) => {
    // Définit le chemin de destination dans le projet Angular
    const path = `src/app/${strings.dasherize(options.name)}`;
    const templateSource = url('./files');
    const templateProcessed = apply(templateSource, [
      template({
        ...options,
        ...strings,
      }),
      move(path),
    ]);
    return chain([mergeWith(templateProcessed)])(tree, context);
  };
}
