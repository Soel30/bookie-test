import type { ComponentProps, JSXElementConstructor, PropsWithChildren } from "react";

/**
 * @name ApiResponseType
 * @description General Response Type
 */
export interface ApiResponseType<T> {
  message?: string;
  status?: number;
  data: T;
  loading?: boolean;
  error?: boolean;
}

/**
 * With children
 *
 * @descriptions Adds an optional `ReactNode` property called `children`
 *
 * @example
 * ```
 *  interface Props extends WithChildren {
 * 	foo: string;
 * }
 * ```
 * @example
 * ```
 * type Props = WithChildren<{
 * 	foo: string;
 * }>
 * ```
 */
export type WithChildren<T = {}> = PropsWithChildren<T>;

/**
 * With ClassName
 *
 * @description Adds an optional `className` property to a provided generic type
 *
 * @example
 * ```
 * interface Props extends WithClassName {
 * 	foo: string;
 * }
 * ```
 *
 * @example
 * ```
 * type Props = WithClassName<{
 * 	foo: string;
 * }>
 * ```
 */
export type WithClassName<T = {}> = T & {
  className?: string;
};

/**
 * With Props
 *
 * @description Extracts the prop types from the typeof of a provided React component
 *
 * @example
 * ```
 * interface ParentProps {
 * 	foo: string;
 * }
 *
 * const Parent = (props: ParentProps) => <></>
 *
 * interface Props extends WithProps<typeof Parent> {}
 * ```
 */
export type WithProps<
  T extends keyof JSX.IntrinsicElements | JSXElementConstructor<U>,
  U = any
> = ComponentProps<T>;