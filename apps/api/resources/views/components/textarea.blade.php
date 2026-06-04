@props(['label' => null, 'name' => null, 'required' => false])

<div class="flex flex-col gap-1 max-w-md mt-4">
    @if($label)
        <label for="{{ $name }}" class="font-semibold">
            {{ $label }}
            @if($required)
                <span class="text-red-500">*</span>
            @endif
        </label>
    @endif
    <textarea id="{{ $name }}"
              name="{{ $name }}" {{ $attributes->merge(['class' => 'border border-neutral-300 rounded-lg px-6 py-3 resize-none', 'rows' => 10]) }}>{{ $slot }}</textarea>

    @error($name)
    <span class="text-red-500 text-sm mt-1">{{ $message }}</span>
    @enderror
</div>
