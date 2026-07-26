import { v1 as uuidv1 } from 'uuid';
import { DataRange } from '../../models/DataRange';
import { EquivalenceClass } from '../../models/EquivalenceClass';
import { Parameter } from '../../models/Parameter';

type SuggestedAttribute = {
  atributo?: string;
  tipo?: string;
  intervalo?: string;
};

type SuggestedEquivalenceClass = {
  nome?: string;
  quantidadeCasos?: number;
  saidaEsperada?: string;
  atributos?: SuggestedAttribute[];
};

function normalizeName(value?: string) {
  return (value || '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .trim()
    .toLowerCase();
}

function parseNumbers(range: string) {
  return range.match(/-?\d+(\.\d+)?/g) || [];
}

function formatDate(range: string) {
  const trimmedRange = range.trim();
  const isoDateMatch = trimmedRange.match(/^(\d{4})-(\d{2})-(\d{2})$/);

  if (isoDateMatch) {
    return `${isoDateMatch[3]}-${isoDateMatch[2]}-${isoDateMatch[1]}`;
  }

  return trimmedRange;
}

function formatRange(range: string, type?: string, paramId?: string): DataRange {
  const normalizedType = (type || '').toLowerCase();

  if (normalizedType === 'boolean') {
    return {
      param_id: paramId,
      v1: range.toLowerCase().includes('false') ? 'false' : 'true',
      v2: '',
      v3: '',
    };
  }

  if (normalizedType === 'date') {
    return { param_id: paramId, v1: formatDate(range), v2: formatDate(range), v3: '' };
  }

  if (normalizedType === 'char') {
    return {
      param_id: paramId,
      v1: range
        .split(/[;,]/)
        .map((value) => value.trim())
        .filter(Boolean)
        .map((value) => value[0])
        .join(';'),
      v2: '',
      v3: '',
    };
  }

  if (['int', 'double', 'float'].includes(normalizedType)) {
    const numbers = parseNumbers(range);
    return {
      param_id: paramId,
      v1: numbers[0] || '',
      v2: numbers[1] || numbers[0] || '',
      v3: numbers.slice(2).join(';'),
    };
  }

  if (normalizedType === 'string') {
    const value = range.replace(/[[\]]/g, '').trim();
    return {
      param_id: paramId,
      v1: `[${value}]`,
      v2: `[${Math.max(value.length, 1)}~${Math.max(value.length, 1)}]`,
      v3: '',
    };
  }

  return { param_id: paramId, v1: range, v2: '', v3: '' };
}

export function convertSuggestedEquivalenceClasses(
  suggestions: SuggestedEquivalenceClass[] | undefined,
  parameters: Parameter[],
  returnType: string,
): EquivalenceClass[] {
  return (suggestions || []).map((suggestion, index) => ({
    identifier: uuidv1(),
    name: suggestion.nome || `suggested_equivalence_class_${index + 1}`,
    numberOfCases: Math.max(1, Number(suggestion.quantidadeCasos) || 1),
    expectedOutputRange: formatRange(suggestion.saidaEsperada || '', returnType),
    acceptableParamRanges: parameters.map((parameter) => {
      const attribute = (suggestion.atributos || []).find(
        (candidate) =>
          normalizeName(candidate.atributo) === normalizeName(parameter.name),
      );

      return formatRange(
        attribute?.intervalo || '',
        parameter.type,
        parameter.identifier,
      );
    }),
  }));
}
