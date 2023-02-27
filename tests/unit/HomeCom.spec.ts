import { shallowMount } from "@vue/test-utils";
import HomeCom from "@/components/HomeCom.vue";


describe("HomeCom.vue", () => {
  it("check wrapper existence", () => {
    const wrapper = shallowMount(HomeCom);
    expect(wrapper.exists()).toBe(true);
  });

  it("renders the message in Home page", () => {
    const msg = "Hello User!";
    const wrapper = shallowMount(HomeCom, {});
    expect(wrapper.text()).toMatch(msg);
  });

  it("renders the message in Home page using selector", () => {
    const msg = "Hello User!";
    const wrapper = shallowMount(HomeCom);
    const testText = wrapper.get('[data-test="testDiv"');
    expect(testText.text()).toBe(msg);
  });


});
