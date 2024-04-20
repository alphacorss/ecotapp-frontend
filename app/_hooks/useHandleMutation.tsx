import { MutationFunction, UseQueryResult, useMutation } from '@tanstack/react-query';

export const useHandleMutation = (
  fn: MutationFunction<unknown, any> | undefined,
  query: UseQueryResult<any, Error>[],
) => {
  const mutation = useMutation({
    mutationFn: fn,
    onSuccess: () => {
      if (query.length === 0) return;
      query.forEach((q) => {
        q.refetch();
      });
    },
  });
  return mutation;
};
