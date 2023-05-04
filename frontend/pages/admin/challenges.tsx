import axios from "axios";
import FeedItem from "@/components/FeedItem";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";

import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useState } from "react";

import { Formik, Form, Field } from "formik";

export default function Challenges() {
  const {
    isLoading,
    error,
    data: challenges,
  } = useQuery(["challenges"], async () => {
    return await axios.get("/challenges");
  });

  const [editContent, setEditContent] = useState<any>(null);

  const queryClient = useQueryClient();

  const addMutation = useMutation(
    async (values: any) => {
      const { data } = await axios.post("/challenges", values);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["challenges"] });
      },
    }
  );

  const updateMutation = useMutation(
    async ({ id, values }: any) => {
      const { data } = await axios.patch(`/challenges/${id}`, values);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["challenges"] });
      },
    }
  );

  const deleteMutation = useMutation(
    async (id) => {
      await axios.delete(`/challenges/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["challenges"] });
      },
    }
  );

  const [isModalOpen, setIsModalOpen] = useState(false);

  if (isLoading) return <Loading />;
  if (error) return <div>Error</div>;

  return (
    <Layout>
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-2xl font-bold text-gray-900">Challenges</h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => setIsModalOpen(true)}
          >
            Add challenge
          </button>
        </div>
      </div>

      <div className="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
        <div className="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
          <table className="min-w-full divide-y divide-gray-300">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0"
                >
                  ID
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Name
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Tags
                </th>

                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {challenges?.data.map((challenge: any) => (
                <tr key={challenge.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    {challenge.id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {challenge.name}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {challenge.tags}
                  </td>

                  <td className="relative flex gap-4 justify-end whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <button
                      onClick={() => {
                        setEditContent(challenge);
                        setIsModalOpen(true);
                      }}
                      className="text-indigo-600 hover:text-indigo-900"
                    >
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        await deleteMutation.mutateAsync(challenge.id);
                      }}
                      className="text-red-600 hover:text-red-900"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <Modal
        title={editContent ? `Edit Content ${editContent.id}` : "Add Content"}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      >
        <Formik
          initialValues={{
            name: editContent?.name || "",
            tags: editContent?.tags || "",
          }}
          onSubmit={async (values, { setSubmitting, resetForm }) => {
            try {
              if (editContent) {
                await updateMutation.mutateAsync({
                  id: editContent.id,
                  values,
                });
              } else {
                await addMutation.mutateAsync(values);
              }
              resetForm();
              setIsModalOpen(false);
              setEditContent(null);
            } catch (error) {
              console.error("Error submitting content:", error);
            } finally {
              setSubmitting(false);
            }
          }}
        >
          <Form className="space-y-4">
            <div>
              <label
                htmlFor="name"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2">
                <Field
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="tags"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Tags
              </label>
              <div className="mt-2">
                <Field
                  type="text"
                  name="tags"
                  id="tags"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <button
              type="submit"
              className="mt-2 rounded-md bg-indigo-600 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Submit
            </button>
          </Form>
        </Formik>
      </Modal>
    </Layout>
  );
}
