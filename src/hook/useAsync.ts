import { useState, useCallback, useEffect, useRef } from "react";

interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: Error | null;
}

interface QueryOptions<T> {
  immediate?: boolean;
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

interface MutationOptions<T> {
  onSuccess?: (data: T) => void;
  onError?: (error: Error) => void;
}

// GET 요청을 위한 훅
export function useQuery<T>(
  asyncFunction: () => Promise<T>,
  options: QueryOptions<T> = {}
) {
  const { immediate = true, onSuccess, onError } = options;
  const asyncFunctionRef = useRef(asyncFunction);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);

  // refs 업데이트
  useEffect(() => {
    asyncFunctionRef.current = asyncFunction;
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
  });

  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    isLoading: immediate,
    error: null,
  });

  const execute = useCallback(async () => {
    setState((prev) => ({ ...prev, isLoading: true, error: null }));
    try {
      const data = await asyncFunctionRef.current();
      setState({ data, isLoading: false, error: null });
      onSuccessRef.current?.(data);
      return data;
    } catch (err) {
      const error = err instanceof Error ? err : new Error("An error occurred");
      setState((prev) => ({
        ...prev,
        isLoading: false,
        error,
      }));
      onErrorRef.current?.(error);
      throw error;
    }
  }, []); // 의존성 제거

  // 즉시 실행이 필요한 경우
  useEffect(() => {
    if (immediate) {
      execute();
    }
  }, [immediate, execute]);

  return {
    ...state,
    execute,
  };
}

// 변이(POST, PUT, DELETE 등) 요청을 위한 훅
export function useMutation<T, P>(
  mutationFunction: (params: P) => Promise<T>,
  options: MutationOptions<T> = {}
) {
  const { onSuccess, onError } = options;
  const mutationFunctionRef = useRef(mutationFunction);
  const onSuccessRef = useRef(onSuccess);
  const onErrorRef = useRef(onError);

  // refs 업데이트
  useEffect(() => {
    mutationFunctionRef.current = mutationFunction;
    onSuccessRef.current = onSuccess;
    onErrorRef.current = onError;
  });

  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    isLoading: false,
    error: null,
  });

  const mutate = useCallback(
    async (params: P) => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));
      try {
        const data = await mutationFunctionRef.current(params);
        setState({ data, isLoading: false, error: null });
        onSuccessRef.current?.(data);
        return data;
      } catch (err) {
        const error =
          err instanceof Error ? err : new Error("An error occurred");
        setState((prev) => ({
          ...prev,
          isLoading: false,
          error,
        }));
        onErrorRef.current?.(error);
        throw error;
      }
    },
    [] // 의존성 제거
  );

  return {
    ...state,
    mutate,
  };
}
