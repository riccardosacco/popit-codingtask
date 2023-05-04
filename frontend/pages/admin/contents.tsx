import axios from "axios";
import Layout from "@/components/Layout";
import Loading from "@/components/Loading";
import Modal from "@/components/Modal";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { Formik, Form, Field } from "formik";

export default function Contents() {
  const {
    isLoading,
    error,
    data: contents,
  } = useQuery(["contents"], async () => {
    return await axios.get("/contents");
  });

  const { data: users } = useQuery(["users"], async () => {
    return await axios.get("/users");
  });

  const { data: challenges } = useQuery(["challenges"], async () => {
    return await axios.get("/challenges");
  });

  const [editContent, setEditContent] = useState<any>(null);

  const queryClient = useQueryClient();

  const addMutation = useMutation(
    async (values: any) => {
      const { data } = await axios.post("/contents", values);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["contents"] });
      },
    }
  );

  const updateMutation = useMutation(
    async ({ id, values }: any) => {
      const { data } = await axios.patch(`/contents/${id}`, values);
      return data;
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["contents"] });
      },
    }
  );

  const deleteMutation = useMutation(
    async (id) => {
      await axios.delete(`/contents/${id}`);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["contents"] });
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
          <h1 className="text-2xl font-bold text-gray-900">Contents</h1>
        </div>
        <div className="mt-4 sm:ml-16 sm:mt-0 sm:flex-none">
          <button
            type="button"
            className="block rounded-md bg-indigo-600 px-3 py-2 text-center text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            onClick={() => setIsModalOpen(true)}
          >
            Add content
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
                  Image URL
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Likes
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  User
                </th>
                <th
                  scope="col"
                  className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                >
                  Challenge
                </th>

                <th scope="col" className="relative py-3.5 pl-3 pr-4 sm:pr-0">
                  <span className="sr-only">Edit</span>
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {contents?.data.map((content: any) => (
                <tr key={content.id}>
                  <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0">
                    {content.id}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {content.image_url}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {content.likes}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {content.user.instagram_uname}
                  </td>
                  <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                    {content.challenge.name}
                  </td>

                  <td className="relative flex gap-4 justify-end whitespace-nowrap py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-0">
                    <button
                      className="text-indigo-600 hover:text-indigo-900"
                      onClick={() => {
                        setEditContent(content);
                        setIsModalOpen(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      onClick={async () => {
                        await deleteMutation.mutateAsync(content.id);
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
            image_url: editContent?.image_url || "",
            likes: editContent?.likes || 0,
            user: editContent?.user?.id || "",
            challenge: editContent?.challenge?.id || "",
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
                htmlFor="image_url"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Image URL
              </label>
              <div className="mt-2">
                <Field
                  type="text"
                  name="image_url"
                  id="image_url"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="likes"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Likes
              </label>
              <div className="mt-2">
                <Field
                  type="number"
                  name="likes"
                  id="likes"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>
            <div>
              <label
                htmlFor="user"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                User
              </label>
              <Field
                as="select"
                id="user"
                name="user"
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="" disabled>
                  Select user...
                </option>
                {users?.data.map((user: any) => (
                  <option key={user.id} value={user.id}>
                    {user.instagram_uname}
                  </option>
                ))}
              </Field>
            </div>
            <div>
              <label
                htmlFor="challenge"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Challenge
              </label>
              <Field
                as="select"
                id="challenge"
                name="challenge"
                className="mt-2 block w-full rounded-md border-0 py-1.5 pl-3 pr-10 text-gray-900 ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-indigo-600 sm:text-sm sm:leading-6"
              >
                <option value="" disabled>
                  Select challenge...
                </option>
                {challenges?.data.map((challenge: any) => (
                  <option key={challenge.id} value={challenge.id}>
                    {challenge.name}
                  </option>
                ))}
              </Field>
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
