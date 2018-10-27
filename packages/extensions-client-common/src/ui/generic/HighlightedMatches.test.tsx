import * as assert from 'assert'
import { describe } from 'mocha'
import { fuzzyMatches, Span } from './HighlightedMatches'

describe('fuzzyMatches', () => {
    const TESTS = [
        { text: '', pattern: '', want: [] },
        { text: 'a', pattern: '', want: [{ start: 0, end: 1, match: false }] },
        { text: '', pattern: 'a', want: [] },
        { text: 'a', pattern: 'a', want: [{ start: 0, end: 1, match: true }] },
        { text: 'a', pattern: 'b', want: [{ start: 0, end: 1, match: false }] },
        { text: 'aa', pattern: 'a', want: [{ start: 0, end: 1, match: true }, { start: 1, end: 2, match: false }] },
        {
            text: 'aba',
            pattern: 'a',
            want: [{ start: 0, end: 1, match: true }, { start: 1, end: 3, match: false }],
        },
        {
            text: 'abaa',
            pattern: 'a',
            want: [{ start: 0, end: 1, match: true }, { start: 1, end: 4, match: false }],
        },
        { text: 'a', pattern: 'aa', want: [{ start: 0, end: 1, match: true }] },
        { text: 'aa', pattern: 'aa', want: [{ start: 0, end: 2, match: true }] },
        { text: 'aaa', pattern: 'aa', want: [{ start: 0, end: 2, match: true }, { start: 2, end: 3, match: false }] },
        {
            text: 'abaa',
            pattern: 'aa',
            want: [
                { start: 0, end: 1, match: true },
                { start: 1, end: 2, match: false },
                { start: 2, end: 3, match: true },
                { start: 3, end: 4, match: false },
            ],
        },
        {
            text: 'abaaba',
            pattern: 'aaa',
            want: [
                { start: 0, end: 1, match: true },
                { start: 1, end: 2, match: false },
                { start: 2, end: 4, match: true },
                { start: 4, end: 6, match: false },
            ],
        },
        {
            text: 'xaxcxbxca',
            pattern: 'abc',
            want: [
                { start: 0, end: 1, match: false },
                { start: 1, end: 2, match: true },
                { start: 2, end: 5, match: false },
                { start: 5, end: 6, match: true },
                { start: 6, end: 7, match: false },
                { start: 7, end: 8, match: true },
                { start: 8, end: 9, match: false },
            ],
        },
    ] as { text: string; pattern: string; want: Span[] }[]
    for (const { text, pattern, want } of TESTS) {
        it(`matches ${JSON.stringify(pattern)} in ${JSON.stringify(text)}`, () => {
            assert.deepStrictEqual(fuzzyMatches(text, pattern), want)
        })
    }
})
